package casa_de_cha.repository;

import casa_de_cha.model.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Venda_Repository extends JpaRepository<Venda, Integer> {

}


