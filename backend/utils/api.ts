const API_URL = process.env.NEXT_PUBLIC_API_URL;// ✅ SIGNUP
export const signupUser = async (data: any) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (err) {
    return { error: "Signup failed" };
  }
};

// ✅ LOGIN
export const loginUser = async (data: any) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    // 🔥 SAVE TOKEN
    if (result.token) {
      localStorage.setItem("token", result.token);
    }

    return result;

  } catch (err) {
    return { error: "Login failed" };
  }
};

// ✅ CREATE BOOKING
export const createBooking = async (data: any) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/booking/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await res.json();

  } catch (err) {
    return { error: "Booking failed" };
  }
};

// ✅ GET BOOKINGS (FOR ADMIN / DASHBOARD)
export const getBookings = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/booking/admin/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();

  } catch (err) {
    return [];
  }
};

// ✅ DELETE BOOKING (ADMIN)
export const deleteBooking = async (id: string) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/booking/admin/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();

  } catch (err) {
    return { error: "Delete failed" };
  }
};