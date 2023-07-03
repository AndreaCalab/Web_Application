package progetto.controller;
import java.io.IOException;
import java.net.http.HttpResponse.ResponseInfo;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;
import java.util.ArrayList;

import javax.inject.Inject;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.io.File;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.WebContext;

import progetto.persistenza.DBManager;
import progetto.persistenza.dao.postgres.ImmobileDaoPostgres;
import progetto.persistenza.dao.postgres.RecensioneDaoPostgres;
import progetto.persistenza.model.Recensione;



@WebServlet(urlPatterns= {"/recensioni"})
public class ListaRecensioni extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
	
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException  {
		List<Recensione> recensioni= DBManager.getInstance().getRecensioneDao().findAll();
			
		
		req.setAttribute("lista_recensioni", recensioni);
		RequestDispatcher dispacher = getServletContext().getRequestDispatcher("/views/recensioni.html");
		
		dispacher.forward(req, resp);
	}
	
	
	
	
	

}