from tensorflow.keras.models import load_model
import numpy as np
import cv2
import requests
import sys

weight_file = "mango.h5"
model = load_model(weight_file)

img_name = "mango.jpg"
img_size = (86, 86)


def predict_mango(image_url):

    # Image preprocessing and download
    img_data = requests.get(image_url).content
    with open(img_name, 'wb') as handler:
        handler.write(img_data)

    # Read and Resize Image
    img = cv2.imread(img_name)
    resized_img = cv2.resize(img, img_size)

    # Expand dimensions to fit requirements of network and convert to np array as well
    exp_dim_img = np.expand_dims(resized_img, axis=0)
    np_img = np.array(exp_dim_img)

    res_arr = model.predict(np_img)
    res = np.argmax(res_arr)

    if res == 0:
        prediction = "Unripe"
    elif res == 1:
        prediction = "Ripe"
    else:
        prediction = "Overripe"

    return prediction


predict_mango("https://firebasestorage.googleapis.com/v0/b/mangometer-2e7ef.appspot.com/o/mango?alt=media&token=5d8da754-f6d1-418c-813b-407fb47ac948")
