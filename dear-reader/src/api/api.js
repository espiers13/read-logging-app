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

const openLibrary = axios.create({
  baseURL: "https://openlibrary.org/api",
});

const openLibrarySearch = axios.create({
  baseURL: "https://openlibrary.org",
});

const nytKey = "TeQkGTyrIZAealqg2ZdcNa7V9x01IZVj";

const googleBooksKey = "AIzaSyAaehyiaB7KOgp3o2OI_u5WB9XZ7iJhUDo";

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

export const fetchBookByISBN = (isbn) => {
  const url = `/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;

  return openLibrary
    .get(url)
    .then(({ data }) => {
      return data[`ISBN:${isbn}`];
    })
    .catch((err) => {
      throw err;
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

export const searchOpenLibrary = (search_query, params) => {
  let search = "q";
  if (params) {
    search = params;
  }

  const url = `search.json?${search}=${search_query}`;

  return openLibrarySearch
    .get(url)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getISBNByOL = (olCode) => {
  const url = `/books/${olCode}.json`;

  return openLibrarySearch
    .get(url)
    .then(({ data }) => {
      return data.isbn_13;
    })
    .catch((err) => {
      console.log(err);
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

export const updateUserDetails = (username, password, newData) => {
  const input = { username, password, newData };
  return userApi
    .patch(`/user`, input)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const updateUserPassword = (username, password, newPassword) => {
  const input = { username, password, newPassword };
  return userApi
    .patch(`/user/password`, input)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteUser = (username, password) => {
  const input = { username, password };
  console.log(input);

  return userApi
    .post(`/user/delete`, input)
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

export const deleteFromFavourites = (user_id, isbn) => {
  const input = { user_id: user_id, isbn: isbn };

  return userApi
    .post(`/favourites/delete`, input)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const addToFavourites = (user_id, newBook) => {
  const input = { user_id, newBook };

  return userApi
    .post(`/favourites`, input)
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

export const addToBookshelf = (user_id, isbn, title) => {
  const input = { user_id: user_id, newBook: { isbn: isbn, title: title } };

  return userApi
    .post(`/bookshelf`, input)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const markBookAsRead = (isbn, rating, review, user_id) => {
  const input = { isbn, rating, review };

  return userApi
    .post(`/bookshelf/${user_id}/read`, input)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const updateJournal = (update, user_id) => {
  return userApi
    .patch(`/journal/${user_id}`, update)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getFriendsByUserId = (user_id) => {
  return userApi
    .get(`/friends/${user_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getUserById = (user_id) => {
  return userApi
    .get(`/user/${user_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getIdByUsername = (username) => {
  return userApi
    .get(`/user/${username}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const searchUsers = (search_query) => {
  const input = { search_query };
  return userApi
    .post(`/search/users`, input)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const getFriendRequestsByUserId = (user_id) => {
  return userApi
    .get(`/friends/pending/${user_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

export const sendFriendRequest = (friend_id, user_id) => {
  const input = { user_id: user_id };

  return userApi
    .post(`/friends/request/${friend_id}`, input)
    .then(({ data }) => {
      return data.msg;
    })
    .catch((err) => {
      throw err;
    });
};

export const acceptFriendRequest = (friend_id, user_id) => {
  const input = { user_id };
  return userApi
    .patch(`/friends/accept/${friend_id}`, input)
    .then(({ data }) => {
      return data.msg;
    })
    .catch((err) => {
      throw err;
    });
};

export const deleteFriend = (friend_id, user_id) => {
  const input = { user_id };

  return userApi.post(`/friends/delete/${friend_id}`, input).catch((err) => {
    throw err;
  });
};
