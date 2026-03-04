export function clearForm(setters: React.Dispatch<React.SetStateAction<string>>[]) {
  setters.forEach(setter => setter(""));
}   