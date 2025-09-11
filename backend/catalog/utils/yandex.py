import requests

def get_yandex_disk_download_url(public_link):
    api_url = 'https://cloud-api.yandex.net/v1/disk/public/resources/download'
    params = {'public_key': public_link}
    resp = requests.get(api_url, params=params, timeout=10)
    resp.raise_for_status()
    data = resp.json()
    if 'href' not in data:
        raise Exception(f"No direct download URL in Yandex API response: {data}")
    return data['href']
