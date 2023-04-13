package casa_de_cha.repository;

import casa_de_cha.model.Lote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Lote_Repository extends JpaRepository<Lote, Integer>{

}