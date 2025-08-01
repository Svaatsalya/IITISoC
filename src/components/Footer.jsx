export default function Footer () {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Portofy. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-1">
          <p>Licensed under the</p>
          <a href="https://opensource.org/license/MIT" className="hover:text-purple-400 transition">MIT License</a>
        </div>
      </div>
    </footer>
  );
};
