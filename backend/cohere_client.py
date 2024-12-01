import cohere
from dotenv import load_dotenv
import os
from typing import List, Dict

load_dotenv()

COHERE_API_KEY = os.getenv("COHERE_API_KEY")

co = cohere.ClientV2(COHERE_API_KEY)

def enhance_bio(bio: str) -> str:
    response = co.chat(
        model='command-r-plus-08-2024',
        messages=[{'role': 'user', 'content': 'enhance this bio written by a student for a volunteering platfrom. Only include the bio portion, for example: "I am ...". It should be concise. Make explicit the skills and qualities they possess, given their described experiences: ' + bio}],
    )
    return response.message.content[0].text.strip()

def enhance_application(bio: str, position: str, text: str) -> str:
    response = co.chat(
        model='command-r-plus-08-2024',
        messages=[{'role': 'user', 'content': 'enhance this application for a volunteering opportunity. Only include the application portion, for example: "As a ... I would..". It should be concise.The applicant is a student with the following bio: ' + bio + ' The position is this: ' + position + ' This is their current application: ' + text}],
    )
    return response.message.content[0].text.strip()

def rerank(opportunities: List[Dict], user_bio: str) -> List[Dict]:
    response = co.rerank(
    model="rerank-english-v3.0",
    query="Sort these opportunities based on how likely a person with the following bio will enjoy and be good at them: " + user_bio,
    documents=[{"text": opp["description"], "id": opp["id"]} for opp in opportunities],
    )
    # Create a mapping of index to relevance score
    index_to_score = {item.index: item.relevance_score for item in response.results}
    # Sort opportunities based on the relevance score
    ranked_opportunities = sorted(opportunities, key=lambda opp: index_to_score[opportunities.index(opp)], reverse=True)
    return ranked_opportunities