import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "../Navigation";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Textarea } from "../ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Toast } from "../ui/toast";
import { authService } from "@/services/authService";
import {
  ArrowLeft,
  Star,
  Clock,
  CheckCircle,
  BookOpen,
  Calendar,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Heart,
  Share2,
} from "lucide-react";
import { bookNotesService } from "../../services/bookNotesService";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);

  // Mock data - en el futuro esto vendrá de la API
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
      dateStarted: "2024-01-01",
      dateAdded: "2023-12-20",
      description:
        "Una obra maestra del realismo mágico que narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo. García Márquez teje una narrativa extraordinaria que combina lo fantástico con lo cotidiano, creando un universo único donde la realidad y la magia coexisten de manera natural.",
      publisher: "Editorial Sudamericana",
      isbn: "978-0-06-088328-7",
      language: "Español",
      isFavorite: true,
      notes: [
        {
          id: 1,
          content:
            "La descripción de Macondo es increíblemente vívida. Me recuerda a los pueblos de mi infancia.",
          date: "2024-01-05",
          page: 45,
        },
        {
          id: 2,
          content:
            "El realismo mágico de García Márquez es único. La forma en que describe la levitación del padre Nicanor es magistral.",
          date: "2024-01-10",
          page: 89,
        },
      ],
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
      dateAdded: "2024-01-25",
      description:
        "Una novela distópica que presenta una sociedad totalitaria donde el gobierno controla todos los aspectos de la vida humana. Winston Smith vive en un mundo donde el Gran Hermano lo observa todo y la verdad es maleable según los intereses del Partido.",
      publisher: "Secker & Warburg",
      isbn: "978-0-452-28423-4",
      language: "Inglés",
      isFavorite: false,
      notes: [
        {
          id: 3,
          content:
            "El concepto de 'doblepensar' es terroríficamente relevante en nuestra época.",
          date: "2024-02-05",
          page: 156,
        },
      ],
    },
  ];

  // TODO -- FALTA POR ARREGLAR ESTA PARTE, DONDE HAY QUE QUITAR EL MOCK Y PASAR LOS DATOS DEL LIBRO SELECCIONAO

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const user = await authService.checkAuth();
      if (user) {
        setUserData(user);
        setIsAuthenticated(true);
        // Buscar el libro por ID
        const foundBook = mockBooks.find((book) => book.id === parseInt(id));
        if (foundBook) {
          setBook(foundBook);
          setEditedBook({ ...foundBook });
          await loadNotes(foundBook.id);
        }
      } else {
        setIsAuthenticated(false);
        setUserData(null);
      }
    } catch (error) {
      console.error("Error verificando autenticación:", error);
      setIsAuthenticated(false);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const loadNotes = async (bookId) => {
    try {
      setIsLoadingNotes(true);
      console.log("Loading notes for bookId:", bookId);
      const fetchedNotes = await bookNotesService.getNotes(bookId);
      console.log("Fetched notes:", fetchedNotes);
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Error cargando notas:", error);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [id]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUserData(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "leyendo":
        return { icon: Clock, label: "Leyendo", color: "#F39C12" };
      case "leidos":
        return { icon: CheckCircle, label: "Leído", color: "#2ECC71" };
      case "por-leer":
        return { icon: BookOpen, label: "Por Leer", color: "#3498DB" };
      default:
        return { icon: BookOpen, label: "Desconocido", color: "#7F8C8D" };
    }
  };

  const handleSaveChanges = () => {
    setBook(editedBook);
    setIsEditing(false);
  };

  const handleProgressChange = (value) => {
    const newProgress = value[0];
    setEditedBook((prev) => ({ ...prev, progress: newProgress }));

    // Auto-cambiar estado basado en progreso
    let newStatus = prev.status;
    if (newProgress === 0) newStatus = "por-leer";
    else if (newProgress === 100) newStatus = "leidos";
    else newStatus = "leyendo";

    setEditedBook((prev) => ({ ...prev, status: newStatus }));
  };

  const handleRatingChange = (rating) => {
    setEditedBook((prev) => ({ ...prev, rating }));
  };

  const handleAddNote = async () => {
    if (newNote.trim()) {
      try {
        setIsAddingNote(true);
        const pageNumber = Math.floor(
          (editedBook.progress / 100) * editedBook.pages
        );

        const newNoteData = {
          content: newNote,
          page_number: pageNumber > 0 ? pageNumber : null,
        };

        const createdNote = await bookNotesService.createNote(id, newNoteData);
        setNotes((prev) => [createdNote, ...prev]);
        setNewNote("");
        setIsAddingNote(false);
      } catch (error) {
        console.error("Error creando nota:", error);
        setIsAddingNote(false);
      }
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await bookNotesService.deleteNote(id, noteId);
      setNotes((prev) => prev.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error eliminando nota:", error);
    }
  };

  const toggleFavorite = () => {
    setEditedBook((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#FDFBF6" }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p style={{ color: "#7F8C8D" }}>Cargando detalles del libro...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#FDFBF6" }}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C3E50" }}>
            Acceso Restringido
          </h2>
          <p style={{ color: "#7F8C8D" }}>
            Debes iniciar sesión para ver los detalles del libro.
          </p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#FDFBF6" }}>
        <Navigation
          isAuthenticated={isAuthenticated}
          userData={userData}
          onLogout={handleLogout}
          showLogin={false}
          onToggleAuth={() => {}}
        />
        <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C3E50" }}>
            Libro no encontrado
          </h2>
          <p style={{ color: "#7F8C8D" }} className="mb-6">
            El libro que buscas no existe o no tienes permisos para verlo.
          </p>
          <Button onClick={() => navigate("/biblioteca")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la biblioteca
          </Button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(isEditing ? editedBook.status : book.status);
  const StatusIcon = statusInfo.icon;
  const currentBook = isEditing ? editedBook : book;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FDFBF6" }}>
      <Navigation
        isAuthenticated={isAuthenticated}
        userData={userData}
        onLogout={handleLogout}
        showLogin={false}
        onToggleAuth={() => {}}
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate("/biblioteca")}
            variant="ghost"
            className="text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la biblioteca
          </Button>

          <div className="flex items-center gap-2">
            <Button onClick={toggleFavorite} variant="ghost" size="sm">
              <Heart
                className={`h-4 w-4 ${
                  currentBook.isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Editar
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSaveChanges} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar
                </Button>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedBook({ ...book });
                  }}
                  variant="outline"
                  size="sm"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Book Cover and Basic Info */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white shadow-lg border-0">
              <div className="text-center">
                <img
                  src={currentBook.cover}
                  alt={currentBook.title}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-md mb-6"
                />

                {/* Status Badge */}
                <div className="mb-4">
                  <Badge
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium w-fit mx-auto"
                    style={{
                      backgroundColor: `${statusInfo.color}20`,
                      color: statusInfo.color,
                    }}
                  >
                    <StatusIcon className="h-4 w-4" />
                    {statusInfo.label}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="mb-6">
                  <p
                    className="text-sm font-medium mb-2"
                    style={{ color: "#2C3E50" }}
                  >
                    Tu calificación
                  </p>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => isEditing && handleRatingChange(star)}
                        disabled={!isEditing}
                        className={`${
                          isEditing
                            ? "cursor-pointer hover:scale-110"
                            : "cursor-default"
                        } transition-transform`}
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= (currentBook.rating || 0)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {currentBook.rating && (
                    <p className="text-sm mt-1" style={{ color: "#7F8C8D" }}>
                      {currentBook.rating}/5 estrellas
                    </p>
                  )}
                </div>

                {/* Basic Info */}
                <div className="space-y-3 text-left">
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "#7F8C8D" }}
                    >
                      PÁGINAS
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#2C3E50" }}
                    >
                      {currentBook.pages}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "#7F8C8D" }}
                    >
                      GÉNERO
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#2C3E50" }}
                    >
                      {currentBook.genre}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "#7F8C8D" }}
                    >
                      IDIOMA
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#2C3E50" }}
                    >
                      {currentBook.language}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "#7F8C8D" }}
                    >
                      EDITORIAL
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#2C3E50" }}
                    >
                      {currentBook.publisher}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-medium"
                      style={{ color: "#7F8C8D" }}
                    >
                      ISBN
                    </p>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "#2C3E50" }}
                    >
                      {currentBook.isbn}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Author */}
            <Card className="p-6 bg-white shadow-lg border-0">
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: "#2C3E50" }}
              >
                {currentBook.title}
              </h1>
              <p className="text-xl mb-4" style={{ color: "#7F8C8D" }}>
                por {currentBook.author}
              </p>

              {/* Description */}
              <div className="mb-6">
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: "#2C3E50" }}
                >
                  Descripción
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#2C3E50" }}
                >
                  {currentBook.description}
                </p>
              </div>
            </Card>

            {/* Progress and Status */}
            <Card className="p-6 bg-white shadow-lg border-0">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "#2C3E50" }}
              >
                Progreso de Lectura
              </h3>

              <div className="space-y-4">
                {/* Progress Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#7F8C8D" }}
                    >
                      Progreso
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#2C3E50" }}
                    >
                      {currentBook.progress}% (
                      {Math.floor(
                        (currentBook.progress / 100) * currentBook.pages
                      )}{" "}
                      de {currentBook.pages} páginas)
                    </span>
                  </div>
                  {isEditing ? (
                    <Slider
                      value={[currentBook.progress]}
                      onValueChange={handleProgressChange}
                      max={100}
                      step={1}
                      className="mb-4"
                    />
                  ) : (
                    <Progress
                      value={currentBook.progress}
                      className="h-3 mb-4"
                    />
                  )}
                </div>

                {/* Status Selector */}
                {isEditing && (
                  <div>
                    <span
                      className="text-sm font-medium block mb-2"
                      style={{ color: "#7F8C8D" }}
                    >
                      Estado
                    </span>
                    <Select
                      value={currentBook.status}
                      onValueChange={(value) =>
                        setEditedBook((prev) => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="por-leer">Por Leer</SelectItem>
                        <SelectItem value="leyendo">Leyendo</SelectItem>
                        <SelectItem value="leidos">Leído</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </Card>

            {/* Dates */}
            <Card className="p-6 bg-white shadow-lg border-0">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "#2C3E50" }}
              >
                Fechas
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentBook.dateAdded && (
                  <div className="flex items-center gap-3">
                    <Calendar
                      className="h-5 w-5"
                      style={{ color: "#7F8C8D" }}
                    />
                    <div>
                      <p
                        className="text-xs font-medium"
                        style={{ color: "#7F8C8D" }}
                      >
                        AÑADIDO
                      </p>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#2C3E50" }}
                      >
                        {new Date(currentBook.dateAdded).toLocaleDateString(
                          "es-ES"
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {currentBook.dateStarted && (
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5" style={{ color: "#F39C12" }} />
                    <div>
                      <p
                        className="text-xs font-medium"
                        style={{ color: "#7F8C8D" }}
                      >
                        INICIADO
                      </p>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#2C3E50" }}
                      >
                        {new Date(currentBook.dateStarted).toLocaleDateString(
                          "es-ES"
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {currentBook.dateFinished && (
                  <div className="flex items-center gap-3">
                    <CheckCircle
                      className="h-5 w-5"
                      style={{ color: "#2ECC71" }}
                    />
                    <div>
                      <p
                        className="text-xs font-medium"
                        style={{ color: "#7F8C8D" }}
                      >
                        TERMINADO
                      </p>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#2C3E50" }}
                      >
                        {new Date(currentBook.dateFinished).toLocaleDateString(
                          "es-ES"
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Notes Section */}
            <Card className="p-6 bg-white shadow-lg border-0">
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#2C3E50" }}
                >
                  Mis Notas ({notes?.length || 0})
                </h3>
                <Button
                  onClick={() => setIsAddingNote(true)}
                  size="sm"
                  disabled={isAddingNote}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir nota
                </Button>
              </div>

              {/* Add Note Form */}
              {isAddingNote && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <Textarea
                    placeholder="Escribe tu nota aquí..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="mb-3"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleAddNote} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Guardar nota
                    </Button>
                    <Button
                      onClick={() => {
                        setIsAddingNote(false);
                        setNewNote("");
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}

              {/* Notes List */}
              <div className="space-y-4">
                {isLoadingNotes ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p style={{ color: "#7F8C8D" }}>Cargando notas...</p>
                  </div>
                ) : notes && notes.length > 0 ? (
                  notes.map((note) => (
                    <div key={note.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div
                          className="flex items-center gap-2 text-xs"
                          style={{ color: "#7F8C8D" }}
                        >
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(note.created_at).toLocaleDateString(
                              "es-ES"
                            )}
                          </span>
                          {note.page_number && (
                            <>
                              <span>•</span>
                              <span>Página {note.page_number}</span>
                            </>
                          )}
                        </div>
                        <Button
                          onClick={() => handleDeleteNote(note.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#2C3E50" }}
                      >
                        {note.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">📝</div>
                    <p style={{ color: "#7F8C8D" }}>
                      No tienes notas para este libro aún
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
