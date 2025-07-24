import React from "react";
import { BookCard } from "./BookCard";
import { BookListItem } from "./BookListItem";
import { useState, useEffect } from "react";
import { libraryService } from "../../services/libraryService";

const LibraryGrid = ({ filter, searchQuery, viewMode }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const libraryResponse = await libraryService.getLibrary(); // objeto paginado
      console.log("LIBROS CARGADOS -> : ", libraryResponse);
      setBooks(libraryResponse.data); // accedes al array para setear books
    } catch (err) {
      console.error("Error loading books:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⏳</div>
        <h3 className="text-xl font-semibold mb-2" style={{ color: "#2C3E50" }}>
          Cargando biblioteca...
        </h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold mb-2" style={{ color: "#2C3E50" }}>
          Error al cargar los libros
        </h3>
        <p style={{ color: "#7F8C8D" }}>{error}</p>
        <button
          onClick={loadBooks}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reintentar
        </button>
      </div>
    );
  }
  // Filtro por estado y búsqueda
  const filteredBooks = books.filter((book) => {
    const matchesFilter = filter === "todos" || book.status === filter;
    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold mb-2" style={{ color: "#2C3E50" }}>
          No se encontraron libros
        </h3>
        <p style={{ color: "#7F8C8D" }}>
          {searchQuery
            ? `No hay libros que coincidan con "${searchQuery}"`
            : "No tienes libros en esta categoría aún"}
        </p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {filteredBooks.map((book) => (
          <BookListItem key={book.id} book={book} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {filteredBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default LibraryGrid;
