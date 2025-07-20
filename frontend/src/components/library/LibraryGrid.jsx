import React from "react";
import BookCard from "./BookCard";
import { BookListItem } from "./BookListItem";

const LibraryGrid = ({ filter, searchQuery, viewMode }) => {
  // Datos de prueba
  const mockBooks = [
    {
      id: 1,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      cover:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      status: "leidos",
      rating: 5,
      progress: 100,
      pages: 417,
      genre: "Realismo Mágico",
      dateFinished: "2024-01-15",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      cover:
        "https://images.unsplash.com/photo-1495640452828-3df6795cf69b?w=400&h=600&fit=crop",
      status: "leyendo",
      rating: null,
      progress: 65,
      pages: 328,
      genre: "Distopía",
      dateStarted: "2024-02-01",
    },
    {
      id: 3,
      title: "El Principito",
      author: "Antoine de Saint-Exupéry",
      cover:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
      status: "leidos",
      rating: 4,
      progress: 100,
      pages: 96,
      genre: "Filosofía",
      dateFinished: "2024-01-20",
    },
    {
      id: 4,
      title: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      cover:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      status: "por-leer",
      rating: null,
      progress: 0,
      pages: 1023,
      genre: "Clásico",
      dateAdded: "2024-02-10",
    },
    {
      id: 5,
      title: "Rayuela",
      author: "Julio Cortázar",
      cover:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
      status: "leyendo",
      rating: null,
      progress: 30,
      pages: 600,
      genre: "Experimental",
      dateStarted: "2024-02-05",
    },
    {
      id: 6,
      title: "La sombra del viento",
      author: "Carlos Ruiz Zafón",
      cover:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
      status: "leidos",
      rating: 5,
      progress: 100,
      pages: 565,
      genre: "Misterio",
      dateFinished: "2024-01-10",
    },
  ];

  // Filtro por estado y búsqueda
  const filteredBooks = mockBooks.filter((book) => {
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
