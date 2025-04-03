export async function wait(seconds) { // god bless chat gpt 🙏
    return new Promise(resolve => {
        if (seconds > 0) setTimeout(resolve, seconds * 1000);
        else requestAnimationFrame(resolve);
    });
}


export async function require(path) {
    return await import(path).then(module => {return module})
}

export async function exportJson(path) { // god bless chat gpt 🙏
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`, ", путь: ", path);
        }
        return await response.json();
    } catch (error) {
        console.error('Ошибка при загрузке JSON:', error);
        return null; // Или выбросить ошибку, в зависимости от ваших нужд
    }
}

export function lerp(a,b,t) {
    return a + (b - a) * t
}

export function easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2)
}
