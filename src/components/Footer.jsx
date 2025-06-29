export default function Footer () {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Portofy. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-6">
          <a href="#" className="hover:text-purple-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-purple-400 transition">Terms of Service</a>
          <a href="#" className="hover:text-purple-400 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
};
