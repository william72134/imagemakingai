async function generateImage() {
    const prompt = document.getElementById('prompt').value;
    
    if (prompt.trim() === "") {
        alert("Please enter a prompt");
        return;
    }
    
    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        const imageUrl = data.image_url;
        document.getElementById('generated-image').src = imageUrl;
    } catch (error) {
        console.error('Error generating image:', error);
        alert('Failed to generate image. Please try again.');
    }
}

