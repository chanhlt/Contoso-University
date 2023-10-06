function verifyConfig() {
  if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV config missing!');
  }

  if (!process.env.HTTP_PORT) {
    throw new Error('HTTP_PORT config missing!');
  }
}

verifyConfig();
