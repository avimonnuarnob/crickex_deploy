type status = "ok" | "failed";

type checkapiData = {
  status: status;
  data?: string;
  errors?: string;
};

export async function checkUsername(username: string): Promise<checkapiData> {
  const url = import.meta.env.VITE_API_URL + "/isvalid-username/";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://crickex24.com",
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const data = (await response.json()) as checkapiData;

  if (data.status === "failed") {
    throw new Error(data?.errors);
  }

  return data;
}

export async function checkEmail(email: string): Promise<checkapiData> {
  const url = import.meta.env.VITE_API_URL + "/isvalid-email/";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const data = (await response.json()) as checkapiData;

  if (data.status === "failed") {
    throw new Error(data?.errors);
  }

  return data;
}
