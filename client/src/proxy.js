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
  const { data } = await client.post(`/createSupervisor`, body);
  return data;
}

export async function setSupervisor(body) {
  const { data } = await client.post(`/setSupervisor`, body);
  return data;
}

export async function createShuttle(body) {
  const { data } = await client.post(`/createShuttle`, body);
  return data;
}

export async function setShuttle(body) {
  const { data } = await client.post(`/setShuttle`, body);
  return data;
}


export async function createRider(body) {
  const { data } = await client.post(`/createRider`, body);
  return data;
}

export async function setRider(body) {
  const { data } = await client.post(`/setRider`, body);
  return data;
}

export async function getAllShuttleRiders(shuttleID) {
  const { data } = await client.get(`/getAllShuttleRiders/${shuttleID}`);
  return data;
}

export async function getShuttleRidersByShuttle(shuttleID) {
  const { data } = await client.get(`/getShuttleRidersByShuttle/${shuttleID}`);
  return data;
}

export async function getShuttleRidersByRider(riderID) {
  const { data } = await client.get(`/getShuttleRidersByRider/${riderID}`);
  return data;
}

export async function getLiftRiders(params) {
  const { shuttleID, date } = params;
  const { data } = await client.get(`/getLiftRiders/${shuttleID}/${date}`);
  return data;
}

export async function setLiftRiderMark(body) {
  const { data } = await client.post(`/setLiftRiderMark`, body);
  return data;
}

export async function setLiftRiderApproved(body) {
  const { data } = await client.post(`/setLiftRiderApproved`, body);
  return data;
}
