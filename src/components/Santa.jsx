import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { useSkinnedMeshClone } from "../hooks/useSkinnedMeshClone";

const DISTANCE_OFFSET = 12;

export function Santa(props) {
  const scroll = useScroll();
  const group = useRef();
  // const { nodes, materials, animations } = useGLTF();
  const { scene, materials, animations, nodes } = useSkinnedMeshClone(
    "./models/santa.gltf"
  );
  const { actions, names } = useAnimations(animations, group);
  const [initialPosition] = useState(props.position);

  useFrame((state, delta) => {
    group.current.position.x =
      initialPosition[0] -
      (initialPosition[0] < 0 ? DISTANCE_OFFSET : -DISTANCE_OFFSET) *
        (1 - scroll.offset);
    group.current.rotation.y = 2 * Math.PI * scroll.offset;
  });
  useEffect(() => {
    actions[names[props.animationIndex]].reset().fadeIn(0.5).play();
    console.log(names);
    return () => {
      actions[names[props.animationIndex]].fadeOut(0.5);
    };
  }, [props.animationIndex]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <group>
            <skinnedMesh
              name="Mesh019"
              geometry={nodes.Mesh019.geometry}
              material={materials.Eyes}
              skeleton={nodes.Mesh019.skeleton}
              morphTargetDictionary={nodes.Mesh019.morphTargetDictionary}
              morphTargetInfluences={nodes.Mesh019.morphTargetInfluences}
            />
            <skinnedMesh
              name="Mesh019_1"
              geometry={nodes.Mesh019_1.geometry}
              material={materials.Hair}
              skeleton={nodes.Mesh019_1.skeleton}
              morphTargetDictionary={nodes.Mesh019_1.morphTargetDictionary}
              morphTargetInfluences={nodes.Mesh019_1.morphTargetInfluences}
            />
            <skinnedMesh
              name="Mesh019_2"
              geometry={nodes.Mesh019_2.geometry}
              material={materials.Skin}
              skeleton={nodes.Mesh019_2.skeleton}
              morphTargetDictionary={nodes.Mesh019_2.morphTargetDictionary}
              morphTargetInfluences={nodes.Mesh019_2.morphTargetInfluences}
            />
            <skinnedMesh
              name="Mesh019_3"
              geometry={nodes.Mesh019_3.geometry}
              material={materials.Mouth}
              skeleton={nodes.Mesh019_3.skeleton}
              morphTargetDictionary={nodes.Mesh019_3.morphTargetDictionary}
              morphTargetInfluences={nodes.Mesh019_3.morphTargetInfluences}
            />
            <skinnedMesh
              name="Mesh019_4"
              geometry={nodes.Mesh019_4.geometry}
              material={materials.Shirt}
              skeleton={nodes.Mesh019_4.skeleton}
              morphTargetDictionary={nodes.Mesh019_4.morphTargetDictionary}
              morphTargetInfluences={nodes.Mesh019_4.morphTargetInfluences}
            />
            <skinnedMesh
              name="Mesh019_5"
              geometry={nodes.Mesh019_5.geometry}
              material={materials.Pants}
              skeleton={nodes.Mesh019_5.skeleton}
              morphTargetDictionary={nodes.Mesh019_5.morphTargetDictionary}
              morphTargetInfluences={nodes.Mesh019_5.morphTargetInfluences}
            />
            <skinnedMesh
              name="Mesh019_6"
              geometry={nodes.Mesh019_6.geometry}
              material={materials.Shoes}
              skeleton={nodes.Mesh019_6.skeleton}
              morphTargetDictionary={nodes.Mesh019_6.morphTargetDictionary}
              morphTargetInfluences={nodes.Mesh019_6.morphTargetInfluences}
            />
            <skinnedMesh
              name="Mesh019_7"
              geometry={nodes.Mesh019_7.geometry}
              material={materials.Sole}
              skeleton={nodes.Mesh019_7.skeleton}
              morphTargetDictionary={nodes.Mesh019_7.morphTargetDictionary}
              morphTargetInfluences={nodes.Mesh019_7.morphTargetInfluences}
            />
            <skinnedMesh
              name="Mesh019_8"
              geometry={nodes.Mesh019_8.geometry}
              material={materials.Laces}
              skeleton={nodes.Mesh019_8.skeleton}
              morphTargetDictionary={nodes.Mesh019_8.morphTargetDictionary}
              morphTargetInfluences={nodes.Mesh019_8.morphTargetInfluences}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./models/santa.gltf");
