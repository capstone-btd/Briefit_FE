export default function NoContent({ message }: { message: string }) {
  return (
    <div className="font-basic-16 flex justify-center text-gray-600">
      {message}
    </div>
  );
}
