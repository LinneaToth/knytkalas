//The raw values from EventForm, as strings. Returned together with expected errors so the form can be refilled
//with what the user typed (React 19 resets a form after its action has run, back to its defaultValues)
export type EventFormFields = {
  occasion: string;
  description: string;
  location: string;
  date: string;
  responseDeadline: string;
};

export const getEventFormFields = (formData: FormData): EventFormFields => ({
  occasion: String(formData.get("occasion") ?? ""),
  description: String(formData.get("description") ?? ""),
  location: String(formData.get("location") ?? ""),
  date: String(formData.get("date") ?? ""),
  responseDeadline: String(formData.get("responseDeadline") ?? ""),
});
