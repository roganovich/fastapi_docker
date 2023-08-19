# pull official base image
FROM python:3-alpine

# set work directory
WORKDIR /usr/src

# copy requirements file
COPY ./requirements.txt /usr/src/requirements.txt

# install dependencies
RUN set -eux \
    && apk add --virtual .build-deps build-base \
        libressl-dev libffi-dev gcc musl-dev python3-dev
#postgresql-dev
# install packages
RUN pip install --upgrade pip
# setuptools wheel
RUN pip install -r /usr/src/requirements.txt
RUN rm -rf /root/.cache/pip

# copy project
COPY . /usr/src/