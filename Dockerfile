FROM python:3.7
ENV PYTHONUNBUFFERED 1
RUN apt-get update \
  && apt-get upgrade -y \
  && apt-get install curl \
  && curl -sL https://deb.nodesource.com/setup_12.x | bash - \
  && apt-get install -y nodejs \
  && curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update && apt-get install yarn

RUN mkdir /src
COPY . /src
WORKDIR /src
RUN yarn
RUN pip install -r /src/requirements.txt

EXPOSE 5500

CMD ["python", "server.py"]
