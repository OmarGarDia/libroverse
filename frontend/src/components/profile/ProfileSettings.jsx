import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Shield, Bell, Eye, Database, Trash2 } from "lucide-react";

export const ProfileSettings = ({ userData }) => {
  return (
    <div className="space-y-8">
      {/* Privacidad */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle
            className="flex items-center space-x-2"
            style={{ color: "#2C3E50" }}
          >
            <Shield className="w-5 h-5" style={{ color: "#4DB6AC" }} />
            <span>Privacidad</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium" style={{ color: "#2C3E50" }}>
                Perfil público
              </h4>
              <p className="text-sm text-gray-600">
                Permite que otros usuarios vean tu perfil
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium" style={{ color: "#2C3E50" }}>
                Mostrar estadísticas
              </h4>
              <p className="text-sm text-gray-600">
                Mostrar tus estadísticas de lectura públicamente
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium" style={{ color: "#2C3E50" }}>
                Lista de libros visible
              </h4>
              <p className="text-sm text-gray-600">
                Permitir que otros vean tus libros leídos
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Notificaciones */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle
            className="flex items-center space-x-2"
            style={{ color: "#2C3E50" }}
          >
            <Bell className="w-5 h-5" style={{ color: "#4DB6AC" }} />
            <span>Notificaciones</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium" style={{ color: "#2C3E50" }}>
                Nuevas recomendaciones
              </h4>
              <p className="text-sm text-gray-600">
                Recibir notificaciones de libros recomendados
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium" style={{ color: "#2C3E50" }}>
                Recordatorios de lectura
              </h4>
              <p className="text-sm text-gray-600">
                Recordatorios diarios para mantener tu hábito
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium" style={{ color: "#2C3E50" }}>
                Actividad de la comunidad
              </h4>
              <p className="text-sm text-gray-600">
                Actualizaciones sobre la actividad de otros usuarios
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Preferencias de lectura */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle
            className="flex items-center space-x-2"
            style={{ color: "#2C3E50" }}
          >
            <Eye className="w-5 h-5" style={{ color: "#4DB6AC" }} />
            <span>Preferencias de Lectura</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#2C3E50" }}
            >
              Meta anual de libros
            </label>
            <Input
              type="number"
              defaultValue="50"
              className="w-32 border-2 focus:border-[#4DB6AC]"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#2C3E50" }}
            >
              Géneros preferidos
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                "Fantasía",
                "Ciencia Ficción",
                "Misterio",
                "Romance",
                "Biografía",
                "Historia",
              ].map((genre) => (
                <Button
                  key={genre}
                  variant="outline"
                  size="sm"
                  className="border-2 border-[#4DB6AC] text-[#4DB6AC] hover:bg-[#4DB6AC] hover:text-white"
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gestión de datos */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle
            className="flex items-center space-x-2"
            style={{ color: "#2C3E50" }}
          >
            <Database className="w-5 h-5" style={{ color: "#4DB6AC" }} />
            <span>Gestión de Datos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium" style={{ color: "#2C3E50" }}>
                Exportar mis datos
              </h4>
              <p className="text-sm text-gray-600">
                Descarga todos tus datos en formato JSON
              </p>
            </div>
            <Button
              variant="outline"
              className="border-[#4DB6AC] text-[#4DB6AC] hover:bg-[#4DB6AC] hover:text-white"
            >
              Exportar
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-red-600">Eliminar cuenta</h4>
              <p className="text-sm text-gray-600">
                Esta acción no se puede deshacer
              </p>
            </div>
            <Button
              variant="destructive"
              className="flex items-center space-x-1"
            >
              <Trash2 className="w-4 h-4" />
              <span>Eliminar</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
