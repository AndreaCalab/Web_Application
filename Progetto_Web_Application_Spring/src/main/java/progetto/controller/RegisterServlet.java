package progetto.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import progetto.persistenza.DBManager;
import progetto.persistenza.dao.UtenteDao;
import progetto.persistenza.model.Utente;

@WebServlet("/doRegister")
public class RegisterServlet extends HttpServlet{
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String email=req.getParameter("email");
		String username = req.getParameter("username");
		String password = req.getParameter("password");
		String nome=req.getParameter("nome");
		String cognome=req.getParameter("cognome");
		
		
		UtenteDao udao = DBManager.getInstance().getUtenteDao();
		Utente utente = udao.findByPrimaryKey(username);
		boolean registered;
		if (utente == null) {
			registered = true;
			HttpSession session = req.getSession();
			session.setAttribute("user", utente);
			session.setAttribute("sessionId", session.getId());
			udao.saveOrUpdate(new Utente(username,"cliente",email,password,nome,cognome,"false"));
			req.getServletContext().setAttribute(session.getId(), session);
			}else {
				registered = false;
			}
		if (registered) {
			//RequestDispatcher dispacher = req.getRequestDispatcher("views/index.html");
			//dispacher.forward(req, resp);
			resp.sendRedirect("/");
		}else {
			resp.sendRedirect("/notAuthorized.html");
		}
		
	}

}
