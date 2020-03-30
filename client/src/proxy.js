const client = require('./client');

export async function getAllShuttles() {
  const { data } = await client.get( `/getAllShuttles`);
  return data;
}

export async function getAllSupervisors() {
  const { data } = await client.get( `/getAllSupervisors`);
  return data;
}

export async function getAllRiders() {
  const { data } = await client.get( `/getAllRiders`);
  return data;
}

export async function getShuttle(shuttleID) {
  const { data } = await client.get( `/getShuttle/${shuttleID}`);
  return data;
}

export async function createSupervisor(body) {
  const { data } = await client.post(`/api/createSupervisor`, body);
  return data;
}

export async function setSupervisor(body) {
  const { data } = await client.post(`/api/setSupervisor`, body);
  return data;
}

export async function createShuttle(body) {
  const { data } = await client.post(`/api/createShuttle`, body);
  return data;
}

export async function setShuttle(body) {
  const { data } = await client.post(`/api/setShuttle`, body);
  return data;
}


export async function createRider(body) {
  const { data } = await client.post(`/api/createRider`, body);
  return data;
}

export async function setRider(body) {
  const { data } = await client.post(`/api/setRider`, body);
  return data;
}
