package casa_de_cha.repository;

import casa_de_cha.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Categoria_Repository extends JpaRepository<Categoria, Integer>{

}