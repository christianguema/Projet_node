export default function* uuid(start_idx){
    let i = start_idx;
    while (true){
        yield i++;
    }
}

