import { useState } from "react";
import { BookCard } from "./BookCard";
import { BookListItem } from "./BookListItem";

export const LibraryGrid = ({ filter, searchQuery, viewMode }) => {
  const [books] = useState([
    {
      id: 1,
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      cover:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      status: "leidos",
      progress: 100,
      rating: 5,
      pages: 417,
      genre: "Realismo Mágico",
      dateAdded: "2024-01-15",
      isFavorite: true,
    },
    {
      id: 2,
      title: "El Principito",
      author: "Antoine de Saint-Exupéry",
      cover:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      status: "leyendo",
      progress: 65,
      rating: 4,
      pages: 96,
      genre: "Ficción",
      dateAdded: "2024-02-01",
      isFavorite: true,
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      cover:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
      status: "por-leer",
      progress: 0,
      rating: 0,
      pages: 328,
      genre: "Distopía",
      dateAdded: "2024-02-10",
      isFavorite: false,
    },
    {
      id: 4,
      title: "Don Quijote de la Mancha",
      author: "Miguel de Cervantes",
      cover:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      status: "leidos",
      progress: 100,
      rating: 4,
      pages: 863,
      genre: "Clásico",
      dateAdded: "2023-12-20",
      isFavorite: false,
    },
    {
      id: 5,
      title: "La Casa de los Espíritus",
      author: "Isabel Allende",
      cover:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      status: "leyendo",
      progress: 30,
      rating: 0,
      pages: 433,
      genre: "Realismo Mágico",
      dateAdded: "2024-02-15",
      isFavorite: false,
    },
    {
      id: 6,
      title: "El Alquimista",
      author: "Paulo Coelho",
      cover:
        "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=300&h=400&fit=crop",
      status: "leidos",
      progress: 100,
      rating: 5,
      pages: 163,
      genre: "Ficción",
      dateAdded: "2024-01-05",
      isFavorite: true,
    },
  ]);

  const filteredBooks = books.filter((book) => {
    const matchesFilter =
      filter === "todos" ||
      (filter === "favoritos" && book.isFavorite) ||
      book.status === filter;

    const matchesSearch =
      searchQuery === "" ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

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
            : "Agrega algunos libros a tu biblioteca para comenzar"}
        </p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-3">
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
