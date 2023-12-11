export async function fetcher(url){
    const res = await fetch(url);
    const json = res.json();
    return json;
}