package progetto.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Observable;

import javax.enterprise.inject.Any;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.hateoas.InputType;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.context.annotation.RequestScope;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONStyle;
import net.minidev.json.parser.JSONParser;
import progetto.persistenza.DBManager;
import progetto.persistenza.model.Immobile;
import progetto.persistenza.model.Recensione;
import progetto.persistenza.model.Utente;

@RestController
@CrossOrigin("http://localhost:4200")
public class ImmobileRestController {
	
	
	public Utente getUtente(HttpServletRequest req) {
		String [] sessionIdParam = req.getQueryString().split("&")[0].split("=");
		String sessionId = sessionIdParam[1];
		if (req.getServletContext().getAttribute(sessionId) != null) {
			HttpSession session=(HttpSession)req.getServletContext().getAttribute(sessionId);
			Utente ut=(Utente)session.getAttribute("user");
			return ut;
		}
		else 
			return null;
	}
	
	
	@PostMapping("/immobili")
	public List<Immobile> getImmobili(HttpServletRequest req) {
		String [] sessionIdParam = req.getQueryString().split("&")[0].split("=");
		String sessionId = sessionIdParam[1];
		if (req.getServletContext().getAttribute(sessionId) != null) {
			List<Immobile> immobili = DBManager.getInstance().getImmobileDao().findAll();
			return immobili;
	     /*for(Immobile i:immobili) {
	    	List<Recensione> lista=i.getRecImmobile(rRecensioni);
	    	if(!lista.isEmpty())
	    	i.setRecensioni(lista);
	    	
	     }*/
		}
		else
	     return null;
		
	     
		
	}
	@PostMapping("/immobiliUtente")
	public List<Immobile> getImmobiliUtente(HttpServletRequest req){
		String [] sessionIdParam = req.getQueryString().split("&")[0].split("=");
		String sessionId = sessionIdParam[1];
		if (req.getServletContext().getAttribute(sessionId) != null) {
			List<Immobile> immobili = DBManager.getInstance().getImmobileDao().findAll();
			List<Immobile> immUtente=new ArrayList<Immobile>();
			Utente ut=getUtente(req);
			for(Immobile i:immobili) {
				if(i.getProprietario().equals(ut.getNome()+" "+ut.getCognome()))
					immUtente.add(i);
			}
			return immUtente;
		}
		else
			return null;
	}
	
	
	@PostMapping(value="/annuncio")
	public List<Immobile> addAnnuncio(@RequestBody Immobile immobile,HttpServletRequest req,HttpServletResponse resp) throws Exception {
		String [] sessionIdParam = req.getQueryString().split("&")[0].split("=");
		String sessionId = sessionIdParam[1];
		if(req.getServletContext().getAttribute(sessionId) != null) {
		Integer i=1;
       String id="id"+i.toString();
       Utente prop=getUtente(req);
       if(immobile.getCategoria().equals("") || immobile.getDescrizione().equals("") || immobile.getPrezzo().toString().isEmpty() || immobile.getMetri_quadri().toString().isEmpty() || immobile.getPosizione().equals("")) {
    	   return null;
       }
       else {
    	   //Impostazione di un nuovo id nel caso viene trovato un immobile con quello corrente
    	   if(immobile.getId().equals(null) || DBManager.getInstance().getImmobileDao().findByPrimaryKey(id)!=null) {
    		   while(immobile.getId().equals(null) || DBManager.getInstance().getImmobileDao().findByPrimaryKey(id)!=null) {
    			   i++;
    		       id="id"+i.toString();
    		   }
    		   immobile.setId(id);
    	   }
    	immobile.setProprietario(prop.getNome()+" "+prop.getCognome());
    	DBManager.getInstance().getImmobileDao().saveOrUpdate(immobile);
    	return DBManager.getInstance().getImmobileDao().findAll();
       }
      }
		else
		return null;
	}
	
	@PostMapping("/updateAnnuncio")
	public List<Immobile> updateAnnuncio(@RequestBody Immobile imm,HttpServletRequest req,HttpServletResponse resp) throws IOException{
		System.out.println("Collegato!");
		Boolean mod=false;
		String [] sessionIdParam = req.getQueryString().split("&")[0].split("=");
		String sessionId = sessionIdParam[1];
		Utente ut=getUtente(req);
		List<Immobile> immList=DBManager.getInstance().getImmobileDao().findAll();
		List<Immobile> immUtente=new ArrayList<Immobile>();
		if(req.getServletContext().getAttribute(sessionId) != null) {
		Immobile imm2=DBManager.getInstance().getImmobileDao().findByPrimaryKey(imm.getId());
		Immobile imm3=new Immobile();
		imm3=imm;
		if(imm.getDescrizione().equals(""))
			imm3.setDescrizione(imm2.getDescrizione());
		if(imm.getMetri_quadri().equals(0))
			imm3.setMetri_quadri(imm2.getMetri_quadri());
		if(imm.getPosizione().equals(""))
			imm3.setPosizione(imm2.getPosizione());
		if(imm.getPrezzo().equals(0))
			imm3.setPrezzo(imm2.getPrezzo());
		imm3.setProprietario(ut.getNome()+" "+ut.getCognome());
		for(Immobile i:immList) {
			if(i.getProprietario().equals(ut.getNome()+" "+ut.getCognome()))
				immUtente.add(i);
			else
				System.out.println(i.getProprietario()+" Proprietario:"+ut.getNome()+" "+ut.getCognome());
		}
		DBManager.getInstance().getImmobileDao().saveOrUpdate(imm3);
		}
		
		return immUtente;
	}
	
	
	@PostMapping("/deleteAnnuncio")
	public Boolean deleteAnnuncio(@RequestBody String id,HttpServletRequest req) {
		System.out.println("Collegato!");
		String [] sessionIdParam = req.getQueryString().split("&")[0].split("=");
		String sessionId = sessionIdParam[1];
		String subid=id.substring(7,10);
		if(req.getServletContext().getAttribute(sessionId) != null) {
			Immobile imm=DBManager.getInstance().getImmobileDao().findByPrimaryKey(subid);
			imm.setId(subid);
			DBManager.getInstance().getImmobileDao().delete(imm);
			return true;
		}
		else
			return false;
		
	}
	
	@PostMapping(value="/filter")
	public List<Immobile> getImmobiliOrder(@RequestBody String filtro,HttpServletRequest req,Model model,HttpServletResponse resp) throws Exception {
		String [] sessionIdParam = req.getQueryString().split("&")[0].split("=");
		String sessionId = sessionIdParam[1];
		String param=filtro.split(":")[1];
		String[] p=param.split("}");
		String pio=p[0].substring(1, p[0].length()-1);
		if (req.getServletContext().getAttribute(sessionId) != null) {
		List<Immobile> immobili=DBManager.getInstance().getImmobileDao().findAll();
		System.out.println("Parametro:"+pio);
			Comparator<Immobile> orderByPrice= 
			(Immobile o1,Immobile o2)->o1.getPrezzo().compareTo(o2.getPrezzo());
			Comparator<Immobile> orderByMq= 
				(Immobile o1,Immobile o2)->o1.getMetri_quadri().compareTo(o2.getMetri_quadri());
		if(pio.equals("Prezzo"))
			Collections.sort(immobili,orderByPrice);
		else if(pio.equals("Metri quadri"))
			Collections.sort(immobili, orderByMq);
		
		
		return immobili;
		}
		else
			return null;
	}

}
