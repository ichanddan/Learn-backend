const sessionId = new Map();
function setUser (id, user){
  sessionId.set(id, user);
};
function getUser(id){
  return sessionId.set(id);
};
export { setUser, getUser };
