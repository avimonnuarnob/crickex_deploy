type status = "ok" | "failed";

type checkUsernameapiData = {
  status: status;
  data?: string;
  errors?: string;
};

export async function checkUsername(): Promise<checkUsernameapiData> {
  const url = "https://ai.cloud7hub.uk/isvalid-username/";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: "bishal55" }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const data = (await response.json()) as checkUsernameapiData;

  if (data.status === "failed") {
    throw new Error(data?.errors);
  }

  return data;
}
