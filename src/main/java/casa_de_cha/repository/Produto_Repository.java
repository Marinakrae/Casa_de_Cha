package casa_de_cha.repository;

import casa_de_cha.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Produto_Repository extends JpaRepository<Produto, Integer> {

}