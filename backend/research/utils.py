import re
import asyncio
from aiohttp import ClientSession
import requests
import json


async def fetch_html(payload: str, session: ClientSession) -> tuple:

    base_url = "https://backend.constellate.org/search2/items/?"
    headers = {
        'Authorization': 'UUID 74ff5b2e-0fef-4976-b840-9a048eba469a',
        'content-type': 'application/json'
    }
    response = requests.request(
        "POST", base_url, headers=headers, data=payload)

    return response.text


async def make_requests(payloads: set) -> None:
    async with ClientSession() as session:
        tasks = []
        for payload in payloads:
            tasks.append(
                fetch_html(payload=payload, session=session)
            )
        results = await asyncio.gather(*tasks)
    return results


def generate_payloads(num_articles: int, search_query: str, start: int = 2000, end: int = 2021, _document_type: str = "article", category: str = ""):
    payloads = []
    search_query = "+".join(search_query.split(" "))
    for i in range(0, int(num_articles) + 1, 10):
        payload = json.dumps({
            "keyword": search_query,
            "provider": "",
            "start": start,
            "end": end,
            "publication_title": "",
            "language": "",
            "doc_type": _document_type,
            "category": category,
            "full_text": False,
            "publisher": "",
            "jstor_discipline": "",
            "from": i,
        })
        payloads.append(payload)
    return payloads


def try_map(x, key):
    try:
        return str(x[key]).replace("'", "").replace('"', "")
    except Exception as e:
        return ""


def clean_category(string):
    if not string or "[" not in string:
        return string
    else:
        try:
            return re.findall("label: (.*?)}", string)
        except:
            return None
