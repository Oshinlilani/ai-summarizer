export function chunkText(text, limit = 3000) {
    const words = text.split(" ");
    let chunks = [], chunk = [];

    for(let word of words){
        if((chunk.join(" ").length + word.length) > limit){
            chunks.push(chunk.join(" "));
            chunk = [];
        }
        chunk.push(word);
    }
    if(chunk.length) chunks.push(chunk.join(" "));
    return chunks;
}