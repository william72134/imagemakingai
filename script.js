async function generateImage() {
    const prompt = document.getElementById('prompt').value;
    const response = await fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: prompt })
    });

    const data = await response.json();
    const imageUrl = data.image_url;
    document.getElementById('generated-image').src = imageUrl;
}
