// Demo build: no HTTP submission — feedback is acknowledged locally.

export const submitFeedback = async (apiUrl, projectId, data) => {
  void apiUrl;
  void projectId;
  void data;
  return { ok: true, message: "Demo mode: feedback is not sent to a server." };
};

export const validateConfig = (config) => {
  if (!config.projectId) {
    throw new Error("projectId is required");
  }
  if (!config.apiUrl) {
    throw new Error("apiUrl is required");
  }
  return true;
};
