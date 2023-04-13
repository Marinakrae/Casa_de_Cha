package casa_de_cha.repository;

import casa_de_cha.model.Fornecedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Fornecedor_Repository extends JpaRepository<Fornecedor, Integer>{

}