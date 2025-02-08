interface LoadingProps {
  text?: string;
}

export default function Loading({ text = "Loading..." }: LoadingProps) {
  return (
    <div className="flex justify-center items-center h-screen font-semibold text-xl">
      {text}
    </div>
  );
}
