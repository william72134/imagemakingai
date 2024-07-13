from flask import Flask, request, jsonify
from PIL import Image
import io
import base64
from diffusers import StableDiffusionPipeline

app = Flask(__name__)

# Initialize the Stable Diffusion model
pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4")
pipe = pipe.to("cuda")

def generate_image(prompt):
    image = pipe(prompt)["sample"][0]
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return img_str

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    prompt = data['prompt']
    image_data = generate_image(prompt)
    return jsonify({'image_url': 'data:image/png;base64,' + image_data})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
