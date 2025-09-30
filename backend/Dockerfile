FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /app

# Install system build deps needed by numpy/pandas wheels if wheel isn't available
RUN apt-get update && apt-get install -y --no-install-recommends \
	build-essential \
	gfortran \
	libopenblas-dev \
	liblapack-dev \
	gcc \
	ca-certificates \
	wget \
 && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./

# Upgrade pip tools so newer wheels are used
RUN python -m pip install --upgrade pip setuptools wheel

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
