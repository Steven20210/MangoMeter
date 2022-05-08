from flask import Flask, render_template, request
from test_mango import predict_mango
from flask_ngrok import run_with_ngrok
app = Flask(__name__)
run_with_ngrok(app)

@app.route('/', methods=["GET", "POST"])
def index():
    if request.method == 'POST':
        # Fetch Form data
        json_data = request.json
        print(json_data)
        img_url = json_data['image']

        print("This is the URL: " + img_url)

        # Remember that you still need to be able to process the input form the react native server
        # AKA the form = request.form thing does not work yet

        # form = request.form
        # img_url = form['image']
        # manual for testing purposes
        prediction = predict_mango("https://firebasestorage.googleapis.com/v0/b/mangometer-2e7ef.appspot.com/o/mango?alt=media&token=5d8da754-f6d1-418c-813b-407fb47ac948")
        print("hello")
        print(prediction)
        json_file = {
            'prediction': prediction
        }
        return json_file
    if request.method == 'GET':
        return 'get request'

#absl-py was originally 0.9
# deleted pywin32 from config

if __name__ == '__main__':
    app.run()
