import axios from "axios";

const nytApi = axios.create({
  baseURL: "https://api.nytimes.com/svc/books/v3",
});

const googleBooksApi = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
});

const bookQuotesApi = axios.create({
  baseURL: "https://book-quotes.onrender.com/api",
});

const userApi = axios.create({
  baseURL: "https://dear-reader-backend.onrender.com/api",
});

const nytKey = "TeQkGTyrIZAealqg2ZdcNa7V9x01IZVj";

const googleBooksKey = "AIzaSyAbtrbN1oivlDmrVumaSTLz268zlXc92qk";

export const getBestSellers = async (retries = 5, delay = 1000) => {
  const url = `/lists/current/hardcover-fiction.json?api-key=${nytKey}`;

  for (let i = 0; i < retries; i++) {
    try {
      const response = await nytApi.get(url);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.log("Rate limit hit. Retrying...");
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        throw error;
      }
    }
  }
  throw new Error("Max retries exceeded");
};

export const getBookByIsbn = (book_isbn) => {
  const url = `/volumes?q=isbn:${book_isbn}&key=${googleBooksKey}`;
  return googleBooksApi
    .get(url)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const searchBooks = (search_query, params) => {
  const url = `/volumes?q=${params}${search_query}&printType=books&maxResults=40&orderBy=relevance&key=${googleBooksKey}`;
  return googleBooksApi
    .get(url)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const searchBooksByGenre = (genre) => {
  const url = `/volumes?q=subject:${genre}&printType=books&maxResults=40&orderBy=newest&key=${googleBooksKey}`;
  return googleBooksApi
    .get(url)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getRandomQuote = () => {
  const url = `/quote/random`;

  return bookQuotesApi
    .get(url)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createNewUser = (newUser) => {
  return userApi
    .post(`/signup`, newUser)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const loginUser = (user) => {
  return userApi
    .post(`/login`, user)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getReadJournal = (username) => {
  return userApi
    .get(`/journal/${username}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteFromReadJournal = (id, isbn) => {
  return userApi.delete(`/journal/${id}?isbn=${isbn}`).catch((err) => {
    throw err;
  });
};

export const getFavourites = (user_id) => {
  return userApi
    .get(`/${user_id}/favourites`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getBookshelf = (username) => {
  return userApi
    .get(`/bookshelf/${username}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteFromBookshelf = (id, isbn) => {
  return userApi.delete(`/bookshelf/${id}?isbn=${isbn}`).catch((err) => {
    throw err;
  });
};

export const markBookAsRead = (isbn, rating, review, user_id) => {
  const input = { isbn: isbn, rating: rating, review: review };

  return userApi
    .patch(`/bookshelf/${user_id}`, input)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
