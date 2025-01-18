# Skill Match

## Problem Statement

High school students often face challenges in finding the right volunteer opportunities that align with their interests or help them develop new skills. Simultaneously, organizations struggle to connect with volunteers that fit their requirements. This platform bridges this gap using AI to match students with opportunities, fostering personal growth and effective volunteering experiences.

---

## Video Demonstration

Watch the full project demonstration on YouTube:  
[![AI-Powered Volunteer Matching Platform](https://img.youtube.com/vi/qWnB8xOTpVw/0.jpg)](https://youtu.be/qWnB8xOTpVw)  

---

## Documentation

For detailed documentation, including system design diagrams, workflows, test cases, and project management details, visit our project documentation:  
📄 **[View Documentation](https://publuu.com/flip-book/773515/1714634)**  

### Documentation Highlights:
- **System Architecture**: Overview of the layered design and MVC principles.
- **Workflow Diagrams**: Sequence, activity, and architecture diagrams.
- **Agile Methodology**: Insights into our iterative development process.
- **Testing Approach**: Comprehensive test cases.
- **Subsystem Details**: Authentication, profile management, AI-powered matching, and more.

---

## Features

1. **Student Profiles**  
   - Create personalized profiles based on skills, past experiences, and interests.
   - Explore opportunities to **strengthen current skill sets** or **expand new ones**.

2. **Organization Profiles**  
   - Manage and update profiles with missions, past projects, and contact details.
   - Post and manage volunteer opportunities.

3. **AI-Powered**  
   - Uses traits and skills to recommend the most relevant opportunities.
   - Powered by the **Cohere API** for advanced matching capabilities.
   - Generate application letters to send to organizations.

4. **Search and Apply**  
   - Students can search for opportunities based on filters (location, skills, etc.).
   - Easily apply to opportunities and track application statuses.

5. **Feedback System**  
   - Volunteers can provide feedback on completed opportunities.
   - Organizations can improve future listings based on feedback.

6. **Secure and Scalable**  
   - Robust authentication and access control.
   - Designed to handle high user loads efficiently.

---

## Technical Overview

### Architectural Design

- **Architecture**: Layered client-server model with modular design following MVC principles.
- **Subsystems**:
  - **Authentication**: Secure login and access control.
  - **Profile Management**: Handles student and organization data.
  - **Opportunity Management**: Posts and manages volunteer opportunities.
  - **Application Management**: Tracks and updates volunteer applications.
  - **Notification System**: Sends alerts for updates or new opportunities.

### Technologies Used

- **Frontend**: Javascript, React, Vite, Tailwind CSS  
- **Backend**: Python
- **AI Integration**: Cohere API  
- **Database**: Supabase with Row-Level Security (RLS)  
- **Testing Tools**: JMeter, BCrypt

---

## Non-Functional Requirements (NFRs)

1. **Performance**: 95% of interactions respond within 2 seconds.
2. **Scalability**: Handles up to 10,000 concurrent users.
3. **Usability**: 90% task success rate within 1 minute.
4. **Security**: Compliant with GDPR; robust authentication and data protection.
