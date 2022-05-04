import tensorflow as tf
from tensorflow.keras.datasets import cifar10
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras import Input
from tensorflow.keras.layers import Dense, Dropout, Activation, Flatten
from tensorflow.keras.applications.vgg16 import VGG16
from tensorflow.keras.layers import Conv2D, MaxPooling2D
from tensorflow.keras.models import Model, load_model
import numpy as np
import matplotlib.pyplot as plt
import keras
import cv2
from sklearn.preprocessing import MinMaxScaler

import pickle

X_in = open("img.array", "rb")
X = pickle.load(X_in)

Y_in = open("label.array", "rb")
y = pickle.load(Y_in)

X = X[:1000]
y = y[:1000]
# for x in X:
#     plt.imshow(x)
#     plt.show()

array_Y = np.asarray(y, dtype='int16').reshape((-1, 1))
array_Y = tf.keras.utils.to_categorical(array_Y, 3)

# Convert to Numpy Array for input to network
X = np.array(X)

basemodel = VGG16(weights = 'imagenet', include_top = False, input_tensor = Input(shape=(256, 256, 3)))

for layer in basemodel.layers:
  layer.trainable = False

# model = Sequential()

headmodel = basemodel.output
headmodel = Flatten(name= 'flatten')(headmodel)
headmodel = Dense(3, activation = 'softmax')(headmodel)

model = Model(inputs = basemodel.input, outputs = headmodel)

# model.add(Conv2D(64, (3, 3), input_shape=X.shape[1:]))
# model.add(Activation('relu'))
# model.add(MaxPooling2D(pool_size=(2, 2)))
# model.add(Dropout(0.5))

# model.add(Conv2D(256, (3, 3)))
# model.add(Activation('relu'))
# model.add(MaxPooling2D(pool_size=(2, 2)))

# model.add(Flatten())  # this converts our 3D feature maps to 1D feature vectors
#
# model.add(Dense(64))
#
# model.add(Dense(units=3, activation="softmax"))

opt = keras.optimizers.Adam(learning_rate=0.0001)

model.compile(loss='sparse_categorical_crossentropy',
              optimizer=opt,
              metrics=['acc'])

classified = model.fit(X, array_Y, batch_size=32, epochs=10, validation_split=0.3)

model.save('mango.h5')
print(model.summary())

def graph_stats(classified):
    acc = classified.history['acc']
    val_acc = classified.history['val_acc']
    loss = classified.history['loss']
    val_loss = classified.history['val_loss']
    epochs = range(1, len(acc) + 1)
    plt.plot(epochs, acc, 'bo', label='Training acc')
    plt.plot(epochs, val_acc, 'b', label='Validation acc')
    plt.title('Training and validation accuracy')
    plt.legend()
    plt.show()
    plt.plot(epochs, loss, 'bo', label='Training loss')
    plt.plot(epochs, val_loss, 'b', label='Validation loss')
    plt.title('Training and validation loss')
    plt.legend()
    plt.savefig('model_stats.png')


graph_stats(classified)