# Preprocessing

import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
import os
import cv2
from tqdm import tqdm
import random
import pickle

DATADIR = r"C:\Users\Steven\Documents\GitHub\MangoMeter\nsjggt7tyz-1\Kesar"

CATEGORIES = ["Big", "Medium", "Small"]

training_data = []

def export_data():

    random.shuffle(training_data)

    imgs = []
    labels = []

    for img, label in training_data:
        temp_array = []
        temp_array.append([img, labels])
        temp_array.append([np.array(tf.image.flip_left_right(img)), labels])
        # # temp_array.append([np.array(tf.image.random_brightness(img, max_delta=0.5)), labels])
        temp_array.append([np.array(tf.image.rot90(img)), labels])
        temp_array.append([np.array(tf.image.random_flip_left_right(img)), labels])
        temp_array.append([np.array(tf.image.random_flip_up_down(img)), labels])
        # plt.imshow(img)
        # plt.show()
        for img, label in temp_array:
            imgs.append(img)
            labels.append(label)

    array_out = open("img.array", "wb")
    pickle.dump(imgs, array_out)
    array_out.close()

    array_out = open("label.array", 'wb')
    pickle.dump(labels, array_out)
    array_out.close()

def create_training_data():

    conditions = ["Partially", "Ripe", "Unripe"]

    for category in CATEGORIES:  # Do Mango Sizes

        img_size = (86, 86)

        path = os.path.join(DATADIR, category)  # create path to mango sizes

        for img in tqdm(os.listdir(path)):
            try:
                for condition in conditions:
                    if condition in img:
                        img_array = cv2.imread(os.path.join(path,img), -1)  # convert to array
                        new_array = cv2.resize(img_array, img_size)  # resize to normalize data size
                        training_data.append([new_array, conditions.index(condition)])
            except Exception as e:  # in the interest in keeping the output clean...
                pass

    export_data()



create_training_data()
