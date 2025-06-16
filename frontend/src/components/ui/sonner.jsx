import { Toaster as Sonner, toast } from "sonner";

const Toaster = (props) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-white text-black border border-gray-200 shadow-lg rounded-md p-4 dark:bg-gray-800 dark:text-white dark:border-gray-700",
          description: "text-gray-600 dark:text-gray-300",
          actionButton:
            "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
          cancelButton:
            "bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
