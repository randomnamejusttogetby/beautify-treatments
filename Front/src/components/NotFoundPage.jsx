import { Link } from "react-router";
function NotFoundPage() {
    return (
        <div className="card text-center">
            <h1 className="title-lg mb-4">404 - Puslapis nerastas</h1>
            <p className="text-muted mb-6">Puslapis, kurio ieškote, neegzistuoja.</p>
            <Link to="/" className="btn-primary">
                Grįžti į pagrindinį puslapį
            </Link>
        </div>
    );
}

export default NotFoundPage;