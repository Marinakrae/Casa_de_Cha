package casa_de_cha.repository;

import casa_de_cha.model.Itens_Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface Itens_Venda_Repository extends JpaRepository<Itens_Venda, Integer> {

}



