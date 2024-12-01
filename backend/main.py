from fastapi import FastAPI, HTTPException, Query
from supabase import create_client, Client
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import bcrypt
from fastapi.middleware.cors import CORSMiddleware
from cohere_client import enhance_bio, enhance_application, rerank

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8000"],  # Allow only your frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

load_dotenv()  
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)


class Volunteer(BaseModel):
    name: str
    email: str
    password: str
    skills: str = None  # Optional for employers
    phone: str = None   # Optional for users

class Opportunity(BaseModel):
    title: str
    description: str
    employer_id: str
    image: str

class Application(BaseModel):
    user_id: str
    opportunity_id: str
    entry: str

class Alerts(BaseModel):
    user_id: str
    message: str

class UserLogin(BaseModel):
    email: str
    password: str

class EmployerLogin(BaseModel):
    email: str
    password: str

#pydantic models for the request body
class BioRequest(BaseModel):
    bio: str

class ApplicationRequest(BaseModel):
    bio: str
    position: str
    text: str

class UserSkills(BaseModel):
    skills: str


@app.get("/")
async def read_root():
    return {"message": "Welcome to the API!"}

@app.post("/login/")
async def login(user: UserLogin):
    # Check if Volunteer exists
    response = supabase.table("volunteers_table").select("*").eq("email", user.email).execute()
    volunteer_data = response.data
    if volunteer_data:
        stored_user = volunteer_data[0]
        stored_password_hash = stored_user['password']
        if not bcrypt.checkpw(user.password.encode('utf-8'), stored_password_hash.encode('utf-8')):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return {"message": "Login successful", "user": stored_user, "type": "volunteer"}

    # Check if Employer exists
    response = supabase.table("employers_table").select("*").eq("email", user.email).execute()
    employer_data = response.data
    if employer_data:
        stored_employer = employer_data[0]
        stored_password_hash = stored_employer['password']
        if not bcrypt.checkpw(user.password.encode('utf-8'), stored_password_hash.encode('utf-8')):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return {"message": "Login successful", "user": stored_employer, "type": "employer"}
    
    # If neither Volunteer nor Employer exists
    raise HTTPException(status_code=401, detail="Invalid email or password")

@app.post("/signup/")
async def sign_up(user: Volunteer):
    # Hash the password
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    # Insert user into the appropriate table based on user type
    if user.phone:  # This indicates that it's an employer
        employer_data = {
            "name": user.name,
            "email": user.email,
            "password": hashed_password,
            "phone": user.phone,
            # Additional fields as necessary
        }
        response = supabase.table("employers_table").insert(employer_data).execute()
        return {"message": "Signup successful", "user": response.data, "type": "employer"}

    else:  # This indicates that it's a user
        volunteer_data = {
            "name": user.name,
            "email": user.email,
            "password": hashed_password,
            "skills": user.skills,
            # Additional fields as necessary
        }

        response = supabase.table("volunteers_table").insert(volunteer_data).execute()
        return {"message": "Signup successful", "user": response.data, "type": "volunteer"}

@app.post("/opportunities/")
async def create_opportunity(opportunity: Opportunity):
    opportunity_data = opportunity.dict()
    response = supabase.table("opportunities_table").insert(opportunity_data).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create opportunity")
    return response.data

@app.delete("/opportunities/{opportunity_id}")
async def delete_opportunity(opportunity_id: str):
    # Delete all applications related to the opportunity
    response = supabase.from_("applications_table").delete().eq("opportunity_id", opportunity_id).execute()
    # Delete the opportunity
    response = supabase.from_("opportunities_table").delete().eq("id", opportunity_id).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to delete opportunity")
    
    return {"message": "Opportunity and related applications deleted successfully"}

@app.get("/opportunities/")
async def get_opportunities():
    response = supabase.from_("opportunities_table").select("*, employers_table(name)").execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to fetch opportunities")
    return response.data

@app.get("/opportunities/created/")
async def get_opportunities(id: str = Query(...)):  # Ensure `id` is a required query parameter
    response = supabase.from_("opportunities_table").select("*, employers_table(name)").eq("employer_id", id).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to fetch opportunities")
    return response.data

@app.get("/opportunities/open/")
async def get_opportunities_open(id: str = Query(...)):  # Ensure `id` is a required query parameter
    response = supabase.from_("opportunities_table").select("*, employers_table(name)").eq("employer_id", id).eq("status", "open").execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to fetch opportunities")
    return response.data

@app.get("/opportunities/started/")
async def get_opportunities_started(id: str = Query(...)):  # Ensure `id` is a required query parameter
    response = supabase.from_("opportunities_table").select("*, employers_table(name)").eq("employer_id", id).eq("status", "started").execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to fetch opportunities")
    return response.data

@app.get("/opportunities/completed/")
async def get_opportunities_completed(id: str = Query(...)):  # Ensure `id` is a required query parameter
    response = supabase.from_("opportunities_table").select("*, employers_table(name)").eq("employer_id", id).eq("status", "completed").execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to fetch opportunities")
    return response.data

@app.post("/opportunities/ranked/")
async def get_ranked_opportunities(bio: UserSkills):
    response = supabase.from_("opportunities_table").select("*, employers_table(name, email)").execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to fetch opportunities")
    
    opportunities = response.data
    ranked_opportunities = rerank(opportunities, bio.skills)
    return {"ranked_opportunities": ranked_opportunities}

@app.post("/applications/")
async def create_application(application: Application):
    application_data = application.dict()
    response = supabase.table("applications_table").insert(application_data).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create application")
    return response.data

@app.delete("/applications/{application_id}")
async def delete_application(application_id: str):
    response = supabase.from_("applications_table").delete().eq("id", application_id).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to delete application")
    return response.data

@app.get("/applications/{opportunity_id}")
async def get_opportunity_applications(opportunity_id: str):
    response = supabase.from_("applications_table").select("*, volunteers_table(name, email)").eq("opportunity_id", opportunity_id).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to fetch applications")
    return response.data

@app.get("/opportunities/applied/{user_id}")
async def get_user_applications(user_id: str):
    response = supabase.from_("applications_table").select("*, opportunities_table(title, description, employer_id, image)").eq("user_id", user_id).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to fetch applications")
    return response.data

@app.post("/alerts/")
async def create_alert(alert: Alerts):
    alert_data = alert.dict()
    response = supabase.table("alerts_table").insert(alert_data).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create alert")
    return response.data

@app.get("/alerts/{user_id}")
async def get_alerts(user_id: str):
    response = supabase.from_("alerts_table").select("*").eq("user_id", user_id).execute() 
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to fetch alerts")
    return response.data

@app.delete("/alerts/{alert_id}")
async def delete_alert(alert_id: str):
    response = supabase.from_("alerts_table").delete().eq("id", alert_id).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to delete alert")
    return response.data

@app.post("/enhance_bio/")
async def enhance_bio_api(request: BioRequest):
    print('endpoint hit')
    print(request.bio)  # Debugging: Print the bio to ensure it's being received
    return enhance_bio(request.bio)

@app.post("/enhance_application/")
async def enhance_application_api(request: ApplicationRequest):
    return enhance_application(request.bio, request.position, request.text)