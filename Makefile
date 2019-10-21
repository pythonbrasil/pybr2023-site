local/create-env:
	@if [ ! -d "venv" ]; then virtualenv -p python3 venv; fi

local/install:
	pip install -r requirements.txt

local/run-server:
	python server.py
