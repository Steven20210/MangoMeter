import tensorflow as tf
import matplotlib.pyplot as plt
from keras.preprocessing import image
import numpy as np
from keras import models
import pickle
import time
import imageio
from PIL import Image
import skimage as sk
import os
import cv2

weight_file = "mango.h5"
model = load_model(weight_file)

def predict_mango(model, image):

    res = model.predict(image)

    if res == 0:
        print("Unripe")
    elif res == 1:
        print("Ripe")
    else:
        print("Overripe")

predict_mango(model, image)