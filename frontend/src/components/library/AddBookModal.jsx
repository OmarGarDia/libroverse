import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  Search,
  Plus,
  X,
  User,
  Settings,
  MessageCircle,
  LogOut,
} from "lucide-react";

export const AddBookModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [manualEntry, setManualEntry] = useState(false);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    pages: "",
    genre: "",
    status: "por-leer",
    description: "",
    coverUrl: "",
  });

  const handleSave = () => {
    console.log("Saving book data:", bookData);

    onClose();
    setBookData({
      title: "",
      author: "",
      pages: "",
      genre: "",
      status: "por-leer",
      description: "",
      coverUrl: "",
    });
    setManualEntry(false);
    setSearchQuery("");
  };

  const mockSearchResults = [
    {
      id: 1,
      title: "El nombre del viento",
      author: "Patrick Rothfuss",
      cover:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      pages: 662,
      genre: "Fantasía",
    },
    {
      id: 2,
      title: "Neuromante",
      author: "William Gibson",
      cover:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      pages: 271,
      genre: "Ciencia Ficción",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: "#FDFBF6" }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl" style={{ color: "#2C3E50" }}>
            Agregar Nuevo Ligro
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!manualEntry ? (
            <>
              {/* Search Section*/}
              <div className="space-y-4">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                    style={{ color: "#7F8C8D" }}
                  />
                  <input
                    type="text"
                    placeholder="Buscar por título o autor..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {searchQuery && (
                  <div className="space-x-3 max-h-60 overflow-y-auto">
                    {mockSearchResults.map((book) => (
                      <div
                        key={book.id}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border"
                        onClick={() => {
                          setBookData({
                            title: book.title,
                            author: book.author,
                            pages: book.pages.toString(),
                            genre: book.genre,
                            status: "por-leer",
                            description: "",
                            coverUrl: book.cover,
                          });
                          setManualEntry(true);
                        }}
                      >
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                        <div className="flex-grow">
                          <h4
                            className="font-semibold"
                            style={{ color: "#2C3E50" }}
                          >
                            {book.title}
                          </h4>
                          <p className="text-sm" style={{ color: "#7F8C8D" }}>
                            por {book.author}
                          </p>
                          <p className="text-xs" style={{ color: "#7F8C8D" }}>
                            {book.genre} * {book.pages} páginas
                          </p>
                        </div>
                        <Plus
                          className="h-5 w-5"
                          style={{ color: "#4DB6AC" }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setManualEntry(true)}
                  className="shadow-md"
                  style={{ borderColor: "#4DB6AC", color: "#4DB6AC" }}
                >
                  O agregar manuelmente
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Manual Entry Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título *</Label>
                    <Input
                      id="title"
                      value={bookData.title}
                      onChange={(e) =>
                        setBookData({ ...bookData, title: e.target.value })
                      }
                      placeholder="Ingrese el título del libro"
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Autor *</Label>
                    <Input
                      id="author"
                      value={bookData.author}
                      onChange={(e) =>
                        setBookData({ ...bookData, author: e.target.value })
                      }
                      placeholder="Ingresa el nombre del autor"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pages">Número de páginas *</Label>
                    <Input
                      id="pages"
                      type="number"
                      value={bookData.pages}
                      onChange={(e) =>
                        setBookData({ ...bookData, pages: e.target.value })
                      }
                      placeholder="Ej: 350"
                    />
                  </div>
                  <div>
                    <Label htmlFor="genre">Género</Label>
                    <Input
                      id="genre"
                      value={bookData.genre}
                      onChange={(e) =>
                        setBookData({ ...bookData, genre: e.target.value })
                      }
                      placeholder="Ej: Ficción, Fantasía, Romance"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="status">Estado</Label>
                    <Select
                      value={bookData.status}
                      onValueChange={(value) =>
                        setBookData({ ...bookData, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="por-leer">Por Leer</SelectItem>
                        <SelectItem value="leyendo">Leyendo</SelectItem>
                        <SelectItem value="leidos">Leído</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="coverUrl">URL de la portada</Label>
                    <Input
                      id="coverUrl"
                      value={bookData.coverUrl}
                      onChange={(e) =>
                        setBookData({ ...bookData, coverUrl: e.target.value })
                      }
                      placeholder="https://ejemplo.com/portada.jpg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descripción (opcional)</Label>
                    <Textarea
                      id="description"
                      value={bookData.description}
                      onChange={(e) =>
                        setBookData({
                          ...bookData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Breve descripción del libro..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              {bookData.coverUrl && (
                <div className="flex justify-center">
                  <img
                    src={bookData.coverUrl}
                    alt="Vista previa"
                    className="w-24 h-32 object-cover rounded-md"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
              <Button
                variant="outline"
                onClick={() => setManualEntry(false)}
                className="w-full"
                style={{ borderColor: "#7F8C8D", color: "#7F8C8D" }}
              >
                Volver a la búsqueda
              </Button>
            </>
          )}
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          {manualEntry && (
            <Button
              onClick={handleSave}
              disabled={!bookData.title || !bookData.author}
              className="shadow-lg"
              style={{ backgroundColor: "#4DB6AC", color: "#FDFBF6" }}
            >
              Agregar Libro
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
